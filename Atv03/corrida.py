from threading import Thread
import timeit 
import time

class Corrida(Thread):
    def __init__(self, nome, velocidade, distancia):
        Thread.__init__(self)
        self.nome = nome
        self.velocidade = velocidade
        self.distancia = distancia

    def run(self):
        start = timeit.default_timer()
        while self.distancia > 0:
            self.distancia -= self.velocidade
            print(self.nome, 'correu', self.velocidade, 'metros e faltam', self.distancia, 'metros')
        
        stop = timeit.default_timer()
        print(self.nome, 'chegou ao fim da corrida em ', stop - start, 'segundos')

if __name__ == '__main__':
    # Criando os objetos
    carro1 = Corrida('Rubinho Barrichello', 10, 50)
    carro2 = Corrida('Felipe Massa', 10, 50)

    # Iniciando as threads
    carro1.start()
    carro2.start()

    # Esperando as threads terminarem
    carro1.join()
    carro2.join()

    print('Fim da corrida')