import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullComponent } from './full.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('FullComponent', () => {
  let component: FullComponent;
  let fixture: ComponentFixture<FullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullComponent, HeaderComponent, SidebarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgbCollapseModule, NgbTooltipModule],
      providers: [Document, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
