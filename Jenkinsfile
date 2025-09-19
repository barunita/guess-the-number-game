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
