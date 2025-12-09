from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.models import db
from app.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

    db.init_app(app)

    from app.routes import routes
    app.register_blueprint(routes)

    # ✅ Explicitly initialize database and create tables
    with app.app_context():
        try:
            from app.models import Item
            db.create_all()
            print("✅ Tables verified/created successfully.")
        except Exception as e:
            print(f"❌ Database initialization failed: {e}")

    @app.route('/')
    def home():
        return {"status": "Backend running successfully with DB connection!"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
