import { Component, Input } from '@angular/core';
import { DescriptionFiller } from 'src/app/shared/models/description.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  @Input() view: DescriptionFiller  = {} as DescriptionFiller
}
