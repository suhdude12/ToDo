from flask import jsonify, request
from app import app, db
from app.models import Todo

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{
        'id': todo.id,
        'text': todo.text,
        'complete': todo.complete
    } for todo in todos])

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    new_todo = Todo(
        text=data['text'],
        complete=False
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({
        'id': new_todo.id,
        'text': new_todo.text,
        'complete': new_todo.complete
    })

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.get_json()
    todo = Todo.query.get(todo_id)
    todo.text = data['text']
    todo.complete = data['complete']
    db.session.commit()
    return jsonify({
        'id': todo.id,
        'text': todo.text,
        'complete': todo.complete
    })

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'result': 'success'})
