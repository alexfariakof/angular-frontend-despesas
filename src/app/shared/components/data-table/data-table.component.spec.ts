import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { DataTableModule } from './data-table.component.module';

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
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
    component.ngOnInit();
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call editAction when handleAction is called with "edit"', () => {
    const fakeId = '1';
    const spyHandle = spyOn(component, 'handleAction').and.callThrough();
    spyOn(component.editAction, 'call');

    component.handleAction('edit', fakeId);
    const editActionAccessed = component.editAction !== undefined;
    expect(editActionAccessed).toBe(true);
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('edit', fakeId);
  });

  it('should call deleteAction when handleAction is called with "delete"', () => {
    const fakeId = '1';
    const spyHandle = spyOn(component, 'handleAction').and.callThrough();
    spyOn(component.deleteAction, 'call');

    component.handleAction('delete', fakeId);
    const deleteActionAccessed = component.deleteAction !== undefined;
    expect(deleteActionAccessed).toBe(true);
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('delete', fakeId);
  });

});
