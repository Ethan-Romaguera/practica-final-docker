pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Obteniendo el código del repositorio...'
                checkout scm
            }
        }

        stage('Prepare env') {
            steps {
                echo 'Creando archivo .env para Jenkins...'
                sh '''
                    cat > .env <<EOF
PORT=3000
MONGO_URI=mongodb://mongo:27017/practica_final
EOF
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Construyendo imágenes Docker...'
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                echo 'Limpiando entorno anterior...'
                sh 'docker-compose down --remove-orphans || true'

                echo 'Levantando servicios para pruebas...'
                sh 'docker-compose up -d'

                echo 'Esperando a que la API arranque...'
                sh 'sleep 10'

                echo 'Comprobando endpoint de salud...'
                sh 'curl -f http://localhost:3000/health'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando entorno completo...'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutada correctamente.'
        }

        failure {
            echo 'La pipeline ha fallado. Revisar logs de Jenkins.'
            sh 'docker-compose logs --tail=100 || true'
        }
    }
}