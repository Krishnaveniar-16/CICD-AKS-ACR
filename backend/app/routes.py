from flask import Blueprint, jsonify, request
from app.models import Item, db

routes = Blueprint('routes', __name__)

@routes.route('/api/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([i.to_dict() for i in items])

@routes.route('/api/items', methods=['POST'])
def create_item():
    data = request.json
    item = Item(name=data['name'])
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201
