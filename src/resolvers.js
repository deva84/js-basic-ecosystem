const { Tasks } = require('./model');

module.exports.resolvers = {
    Query: {
        getTodoTasks: async () => {
            const tasks = await Tasks.find({});
            return tasks.filter(task => task.done === false);
        },
        getDoneTasks: async () => {
            const tasks = await Tasks.find({});
            return tasks.filter(task => task.done === true);
        },
        findTasks: async (root, { tags }) => {
            const tasks = await Tasks.find({ 'tags': { $all: tags }});
            return tasks;
        },
        getTask: async (root, { id }) => {
            const task = await Tasks.findById(id);
            return task;
        }
    },
    Mutation: {
        createTask: (root, { task }) => {
            const newTask = new Tasks({
                title: task.title,
                description: task.description,
                tags: task.tags,
            });

            newTask.id = newTask._id;

            return new Promise((resolve, object) => {
                newTask.save((err) => {
                    if (err) reject(err)
                    else resolve(newTask)
                })
            })
        },
        updateTask: async (root, { id,  task }) => {
           await Tasks.updateOne( {_id: id}, { $set: {
                    title: task.title,
                    description: task.description,
                    tags: task.tags,
                    done: task.done
                }});
            const updated = await Tasks.findById(id);
            return updated;
        },
        deleteTask: async (root, { id }) => {
            const exist = await Tasks.findById(id);
            if (!exist) return true;
            await Tasks.findByIdAndRemove(id, {}, err => {
                if (!err) return true;
            });
        }
    },
};
