const clearCompleted = () => {
  const tasks = JSON.parse(localStorage.getItem('TasksInfo')) || [];
  const completed = tasks.filter((task) => task.completed === false);
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].id = i + 1;
  }
  localStorage.setItem('TasksInfo', JSON.stringify(completed));
  window.location.reload();
};

export default clearCompleted;
