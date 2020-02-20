pipeline {
    agent any

    stages {
        stage ('Build the image') {
            steps {
                sh "docker-compose -f docker-compose.yml build "
            }
        }
        stage ('Run the image') {
            steps {
                sh "docker-compose -f docker-compose-ci.yml up"
            }
        }
    }
}