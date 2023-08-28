from threading import Thread
import timeit
import requests

class WikiMono():
    def __init__(self, wikiPageUrl):
        self.wikiPageUrl = wikiPageUrl
    
    def run(self):
        try:
            response = requests.get(self.wikiPageUrl)

            pageStatus = 'unknown'

            if response.status_code == 200:
                pageStatus = 'Existe'
            elif response.status_code == 404:
                pageStatus = 'Não existe'

            print(f'{self.wikiPageUrl} - {pageStatus}')
        except Exception as e:
            print(f'{self.wikiPageUrl} - {e}')
        
if __name__ == '__main__':
    def gerarWiki(i):
        return 'https://en.wikipedia.org/wiki/' + str(i)
    
    wikiPages = [gerarWiki(i) for i in range(0, 50)]
    
    threads = []

    start = timeit.default_timer()

    for wikiPage in wikiPages:
        WikiMono(wikiPage).run()

    stop = timeit.default_timer()


    
    print(f'Tempo total: {stop - start} segundos')