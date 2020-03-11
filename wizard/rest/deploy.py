from flask import Blueprint, request, jsonify
from subprocess import call

deploy_v1_blueprint = Blueprint('deploy_v1_api', __name__)

@deploy_v1_blueprint.route('/deploy', methods=['POST'])
def deploy():
	data = request.get_json()
	if data['version'] == 'v1':
		if data['deployment'] == 'k8s':
			print('Deploying k8s')
			call('./deploy-k8s.sh')
			return jsonify({"success":"Successfully deployed"})
		elif data['deployment'] == 'openshift':
			print('Deploying openshift')
			call('./../deploy-openshift.sh')
			return jsonify({"success":"Successfully deployed"})
		else:
			return jsonify({"error":"Script not available yet"}), 500
	elif data['version'] == 'v2':
		return jsonify({"error":"Script not available yet"}), 500
	elif data['version'] == 'v3':
		return jsonify({"error":"Script not available yet"}), 500
	else:
		return jsonify({"error":"No version specified"}), 404