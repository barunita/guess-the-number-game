pipeline {
    agent any

    tools {
        nodejs 'node'
        jfrog 'jfrog-cli'
    }

    environment {
        ARTIFACTORY_URL = "https://arunitatrial123.jfrog.io"
        ARTIFACTORY_CREDENTIALS_ID = 'artifactory-credentials'
        NPM_VIRTUAL_REPO = 'npm-virtual'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/barunita/guess-the-number-game.git'
            }
        }

        stage('Configure JFrog CLI') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.ARTIFACTORY_CREDENTIALS_ID, passwordVariable: 'ART_TOKEN', usernameVariable: 'ART_USER')]) {
                    sh "${tool 'jfrog-cli'}/jf c add artifactory-server --url=${env.ARTIFACTORY_URL} --user=${ART_USER} --password=${ART_TOKEN}"
                }
            }
        }
        
        stage('npm Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Configure JFrog npm') {
            steps {
                sh "${tool 'jfrog-cli'}/jf npm-config --repo-resolve ${env.NPM_VIRTUAL_REPO} --repo-deploy ${env.NPM_VIRTUAL_REPO} --server-id-deploy artifactory-server --server-id-resolve artifactory-server"
            }
        }
        
        stage('Publish to Artifactory') {
            steps {
                sh "${tool 'jfrog-cli'}/jf rt npm-publish --repo-deploy ${env.NPM_VIRTUAL_REPO} --server-id-deploy artifactory-server"
            }
        }
    }
}
