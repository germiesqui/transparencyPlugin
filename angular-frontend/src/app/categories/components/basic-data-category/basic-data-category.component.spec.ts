import { of } from "rxjs";
import { BasicDataCategoryComponent } from "./basic-data-category.component";
import { IBasicData } from "./basicData";

describe("BasicDataCategoryComponent", () => {
  let component: BasicDataCategoryComponent;
  let mockBackendService;
  let response: IBasicData;

  beforeEach(() => {
    mockBackendService = jasmine.createSpyObj(["getBasicData"]);
  });

  describe("constructor", () => {
    it("should call getBasicData", () => {
      mockBackendService.getBasicData.and.returnValue(of(true));

      component = new BasicDataCategoryComponent(mockBackendService);

      expect(mockBackendService.getBasicData).toHaveBeenCalled();
    });

    it("should data be equal to the return of getBasicData", () => {
      response = {
        authors: ["Peter", "Jhon"],
        publishDate: new Date(),
        keywords: ["example", "example2"],
        summary: "",
        text: "",
        topImg: "",
        movies: []
      };
      mockBackendService.getBasicData.and.returnValue(of(response));

      component = new BasicDataCategoryComponent(mockBackendService);

      expect(component.basicData).toBe(response);
    });
  });
});
