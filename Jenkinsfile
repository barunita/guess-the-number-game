pipeline {
    agent any

    tools {
        // This must match the Node.js installation name in Jenkins
        nodejs 'node' 
    }

    environment {
        // Your Artifactory URL
        ARTIFACTORY_URL = "https://arunitatrial123.jfrog.io"
        ARTIFACTORY_CREDENTIALS_ID = 'artifactory-credentials'
        NPM_VIRTUAL_REPO = 'npm-virtual'
    }

    stages {
        stage('Checkout') {
            steps {
                // Your GitHub repository and branch
                git branch: 'main', url: 'https://github.com/barunita/guess-the-number-game.git'
            }
        }
        
        stage('npm Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Publish to Artifactory') {
            steps {
                sh 'jfrog rt npm-publish --repo-deploy ' + env.NPM_VIRTUAL_REPO
            }
        }
    }
}