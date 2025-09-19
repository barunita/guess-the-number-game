pipeline {
    agent any

    tools {
        nodejs 'node'
        jfrog 'jfrog-cli'
    }

    environment {
        ARTIFACTORY_URL = "https://arunitatrial123.jfrog.io"
        ARTIFACTORY_CREDENTIALS_ID = 'JF_ACCESS_TOKEN'
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
                withCredentials([string(credentialsId: env.ARTIFACTORY_CREDENTIALS_ID, variable: 'ART_TOKEN')]) {
                    sh "${tool 'jfrog-cli'}/jf c add arunitatrial123 --url=${env.ARTIFACTORY_URL} --access-token=${ART_TOKEN}"
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
                sh "${tool 'jfrog-cli'}/jf npm-config --repo-resolve ${env.NPM_VIRTUAL_REPO} --repo-deploy ${env.NPM_VIRTUAL_REPO} --server-id-deploy arunitatrial123 --server-id-resolve arunitatrial123"
            }
        }
        
        stage('Publish to Artifactory') {
            steps {
                sh "${tool 'jfrog-cli'}/jf npm publish"
            }
        }
    }
}
