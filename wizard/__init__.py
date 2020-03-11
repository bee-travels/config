from flask import Flask
from flask_cors import CORS

def run_app():
    deploy_app = Flask(__name__)
    
    from rest.deploy import deploy_v1_blueprint
    
    deploy_app.register_blueprint(deploy_v1_blueprint, url_prefix="/api/v1")
    
    CORS(deploy_app)
    
    return deploy_app

if __name__ == "__main__":
    run_app().run(host='0.0.0.0', port='8999')