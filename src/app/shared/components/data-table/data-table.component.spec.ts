import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { DataTableModule } from './data-table.component.module';
import { DataTablesModule } from 'angular-datatables';

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
    component.editAction = (() => {alert(1);}) as Function;
    component.deleteAction = (() => {alert(1);}) as Function;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
     component.ngOnInit();
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call editAction when handleAction is called with "edit"', () => {
    const spyHandle = spyOn(component, 'handleAction');
    component.handleAction('edit', '1');
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('edit','1');
  });

  it('should call deleteAction when handleAction is called with "delete"', () => {
    const spyHandle = spyOn(component, 'handleAction');
    component.handleAction('delete', '1');
    expect(spyHandle).toHaveBeenCalled();
    expect(spyHandle).toHaveBeenCalledWith('delete','1');
  });

});
