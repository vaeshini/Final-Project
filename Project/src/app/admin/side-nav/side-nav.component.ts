import { Component } from '@angular/core';
import { faDashboard,faUser,faBox,faPortrait,faBook,faBell} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  faDashboard = faDashboard;
  faUser=faUser;
  faBox=faBox;
  faPortrait=faPortrait;
  faBook=faBook;
  faBell=faBell;

}
