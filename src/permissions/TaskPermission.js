class TaskPermission {
  static canAccess(task, user) {
    const isOwner = task.userId.toString() === user.id;
    const isAdmin = user.role === "ADMIN";

    return isOwner || isAdmin;
  }
}

module.exports = TaskPermission;
