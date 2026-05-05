pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Obteniendo el código del repositorio...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Construyendo la imagen Docker de la API...'
                sh 'docker compose build api'
            }
        }

        stage('Test') {
            steps {
                echo 'Levantando servicios para pruebas...'
                sh 'docker compose up -d'

                echo 'Esperando a que la API arranque...'
                sh 'sleep 10'

                echo 'Comprobando endpoint de salud...'
                sh 'curl -f http://localhost:3000/health'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando entorno completo...'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutada correctamente.'
        }

        failure {
            echo 'La pipeline ha fallado. Revisar logs de Jenkins.'
            sh 'docker compose logs --tail=100'
        }
    }
}