import { WelcomeComponent } from './welcome.component';
import { of, throwError } from 'rxjs';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let URL: string;
  let PostError: boolean;
  let PostErrorMessage: string;
  let mockBackendService;
  let mockRouter;
  let response;

  beforeEach(() => {
    URL = "http://www.google.es";
    PostError = false;
    PostErrorMessage = "";
    
    mockBackendService = jasmine.createSpyObj(["postAnaliceUrl"]);
    mockRouter = jasmine.createSpyObj(["navigate"]);

    component = new WelcomeComponent(mockBackendService, mockRouter);
  });

  describe('onSubmit', () => {
    it('should call postAnaliceUrl with correct url', () => {
      component.url = URL;
      mockBackendService.postAnaliceUrl.and.returnValue(of(true));

      component.onSubmit();

      expect(mockBackendService.postAnaliceUrl).toHaveBeenCalledWith(URL);
    });

    it('should call router.navigate if url is correct', () => {
      response = URL;
      mockBackendService.postAnaliceUrl.and.returnValue(of(response));

      component.onSubmit();

      expect(mockRouter.navigate).toHaveBeenCalled();
    });

    it('should postError be true if postAnaliceUrl return error', () => {
      component.url = 'bad url';
      component.postError = PostError;
      response = {status: 422, error: 'Url incorrecta'};
      mockBackendService.postAnaliceUrl.and.returnValue(throwError(response));

      component.onSubmit();

      expect(component.postError).toBe(true);
    });

    it('should postErrorMessage be equal to the error message thrown by the service if the status error is under 500', () => {
      component.url = 'bad url';
      component.postErrorMessage = PostErrorMessage;
      response = {status: 422, error: 'Url incorrecta'};
      mockBackendService.postAnaliceUrl.and.returnValue(throwError(response));

      component.onSubmit();

      expect(component.postErrorMessage).toBe('Url incorrecta');
    });

    it('should postErrorMessage be equal to Error inesperado en el servidor if the status error is over 500', () => {
      component.url = 'bad url';
      component.postErrorMessage = PostErrorMessage;
      response = {status: 522, error: 'Url incorrecta'};
      mockBackendService.postAnaliceUrl.and.returnValue(throwError(response));

      component.onSubmit();

      expect(component.postErrorMessage).toBe('Error inesperado en el servidor');
    });
  });
});
