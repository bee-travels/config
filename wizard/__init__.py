from flask import Flask, render_template
from flask_cors import CORS

def run_app():
	deploy_app = Flask(__name__)

	@deploy_app.route('/', methods = ['GET'])
	def html():
		return render_template('deploy.html')
	
	from rest.deploy import deploy_v1_blueprint
    
	deploy_app.register_blueprint(deploy_v1_blueprint, url_prefix="/api/v1")
    
	CORS(deploy_app)
    
	return deploy_app

if __name__ == "__main__":
	run_app().run(host='0.0.0.0', port='8999')