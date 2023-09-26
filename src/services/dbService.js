class DatabaseService {
    constructor() {
      this.tasks = [];
    }
  
    async createTask(taskData) {
      const newTask = { id: this.tasks.length + 1, ...taskData };
      this.tasks.push(newTask);
      return newTask;
    }
  
    async updateTask(taskId, taskData) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...taskData };
      return this.tasks[taskIndex];
    }
  
    async getAllTasks(page, pageSize) {
      const startIndex = (page - 1) * pageSize;
      return this.tasks.slice(startIndex, startIndex + pageSize);
    }
  
    async getTaskMetrics() {
      const metrics = {
        open_tasks: this.tasks.filter((task) => task.status === 'open').length,
        inprogress_tasks: this.tasks.filter((task) => task.status === 'inprogress').length,
        completed_tasks: this.tasks.filter((task) => task.status === 'completed').length,
      };
      return metrics;
    }
  }
  
  module.exports = DatabaseService;
  