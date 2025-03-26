module.exports = {
    successMessages: {
      TASK_CREATED: 'Task created successfully',
      TASK_UPDATED: 'Task updated successfully',
      TASK_DELETED: 'Task deleted successfully',
      TASK_RETRIEVED: 'Task retrieved successfully',
      TASKS_RETRIEVED: 'Tasks retrieved successfully',
      USER_LOGGED_IN : 'User login successfully.',
      TASK_SOFT_DELETED : 'Task soft deleted successfully.',
      USER_REGISTERED : ' User register successfully. '
    },
    errorMessages: {
      TASK_CREATION_FAILED: 'Failed to create task.',
      TASK_UPDATE_FAILED: 'Failed to update task.',
      TASK_DELETION_FAILED: 'Failed to delete task.',
      TASK_NOT_FOUND: 'Task not found.',
      TASK_RETRIEVAL_FAILED: 'Failed to retrieve tasks.',
      TASKS_RETRIEVAL_FAILED: 'Failed to retrieve tasks.',
      TASK_NOT_FOUND: 'Task not found to update.',
      USER_REGISTRATION_FAILED: 'User registration is failed.',
      INVALID_CREDENTIALS : 'The user credentials were incorrect.',
      USER_RETRIEVAL_FAILED : 'Failed to retrieve user.',
      USER_UPDATE_FAILED : 'Failed to update user.',
      NO_TOKEN:'Access denied. No token provided.',
      INVALID_TOKEN:'Invalid or expired token.',
      FORBIDDEN: 'You do not have permission to access this resource.',
      TASK_SOFT_DELETE_FAILED: 'There was an error while attempting to soft delete the task',
      USER_NOT_FOUND : ' User not found',
      INVALID_FILTER_STATUS : 'Invalid status filter. Allowed values are "complete" or "incomplete".'
    },
   
    successCodes : {
      OK: 200,
      CREATED: 201,
    },

    clientErrorCodes : {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
    },

    serverErrorCodes : {
      INTERNAL_SERVER_ERROR: 500,
    }

  };
  