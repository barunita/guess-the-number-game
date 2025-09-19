pipeline {

	agent any

	tools {

		jfrog 'jfrog-cli'

		nodejs 'node'

	}

	stages {

		stage('Clone') {

			steps {

				git branch: 'master', url: "https://github.com/barunita/guess-the-number-game.git"

			}

		}



		stage('Exec npm commands') {

			steps {

				dir('npm-example') {

					// Configure npm project's repositories

					jf 'npm-config --repo-resolve npm --repo-deploy npm'



					// Install dependencies

					jf 'npm install'



					// Pack and deploy the npm package

					jf 'npm publish'

				}

			}

		}



		stage('Publish build info') {

			steps {

				jf 'rt build-publish'

			}

		}

	}

}
