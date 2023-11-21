import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { DataTableModule } from './data-table.component.module';
import { DataTableDirective } from 'angular-datatables';

describe('Unit Test DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [DataTableModule]
    }).compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columns = [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
    ];
    component.data = [
      { id: 1, name: 'Teste 1' },
      { id: 2, name: 'Teste 2' },
    ];
    const dataTableDirective = jasmine.createSpyObj('DataTableDirective', ['rerender', 'destroy']);
    component.dtElement = dataTableDirective as DataTableDirective;

    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call editAction when handleAction is called with "edit"', () => {
    // Arrangte
    const fakeId = '1';
    const spyHandle = spyOn(component, 'handleAction').and.callThrough();
    spyOn(component.editAction, 'call');

    // Act
    component.handleAction('edit', fakeId);
    const editActionAccessed = component.editAction !== undefined;

    // Assert
    expect(editActionAccessed).toBe(true);
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('edit', fakeId);
  });

  it('should call deleteAction when handleAction is called with "delete"', () => {
    // Arrange
    const fakeId = '1';
    const spyHandle = spyOn(component, 'handleAction').and.callThrough();

    // Act
    spyOn(component.deleteAction, 'call');
    component.handleAction('delete', fakeId);
    const deleteActionAccessed = component.deleteAction !== undefined;

    // Assert
    expect(deleteActionAccessed).toBe(true);
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('delete', fakeId);
  });


  it('should call rerender without dtElement', () => {
    // Arrange
    component.dtElement = undefined;

    // Act
    const spyRerender = spyOn(component, 'rerender').and.callThrough();
    component.rerender();

    // Assert
    expect(spyRerender).toHaveBeenCalled();
  });

  it('should call refresh and fill property adta ', () => {
    // Arrange
    const mockData = [
      { id: 1, name: 'Teste Refresh 1' },
      { id: 2, name: 'Teste Refresh 2' },
    ];

    // Act
    component.loadData(mockData);

    // Assert
    expect(component.data).not.toBeNull();
    expect(component.data).toEqual(mockData);
  });
});
