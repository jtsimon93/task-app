from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)
CORS(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_name = db.Column(db.String(200))
    status = db.Column(db.Boolean, default=True)

    def serialize(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "status": self.status
        }


class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()

        # List to hold all of the tasks
        tasks_list = []

        # Add each task to the list
        for task in tasks:
            if task.status:
                tasks_list.append(task.serialize())

        response = {
            "status": "success",
            "data": tasks_list
        }
        return response, 200

    def post(self):
        new_task = Task(
            task_name=request.json['task_name'],
        )
        db.session.add(new_task)
        db.session.commit()
        response = {
            'status': "success",
            'data': new_task.serialize()
        }
        return response, 201


class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            response = {
                'status': 'error',
                'message': 'No task with that ID exists'
            }
            return response, 404

        response = {
            'status': 'success',
            'data': task.serialize()
        }
        return response, 200

    def patch(self, task_id):
        task = Task.query.get_or_404(task_id)

        if 'task_name' in request.json:
            task.task_name = request.json['task_name']
        if 'status' in request.json:
            task.status = request.json['status']

        db.session.commit()

        response = {
            'status': 'success',
            'data': task.serialize()
        }
        return response, 201

    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        response = {
            'status': 'success',
            'message': 'the task was successfully deleted'
        }
        return response, 204


api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/task/<int:task_id>')

# Uncomment the line below to delete the data in the database at each start
# db.drop_all()

# Create table if not exists
db.create_all()

if __name__ == '__main__':
    app.run(debug=False)

