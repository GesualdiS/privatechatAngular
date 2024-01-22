
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Component } from '@angular/core';

interface Point {
  name: string;
  children?: Point[];
}

const TREE_DATA: Point[] = [
  {
    name: 'Frequently asked questions',
    children: [
      { name: 'Why using PrivateChat?', children: [{ name: 'PrivateChat provides a secure and private messaging platform for users who value privacy. With features such as end-to-end encryption and two-factor authentication, we prioritize the protection of your personal data.' }] },
      { name: 'How is PrivateChat different from other messaging apps?', children: [{ name: 'PrivateChat distinguishes itself by placing a strong emphasis on user privacy. We offer a secure and protected environment, ensuring that your personal information is not shared without authorization.' }] },
      { name: 'What multimedia options are available?', children: [{ name: 'PrivateChat allows users to exchange messages containing text, images, videos, and other multimedia files in a secure and encrypted manner.' }] },
    ],
  },
  {
    name: 'Exciting Features',
    children: [
      { name: 'Secure Group Chats', children: [{ name: 'PrivateChat enables users to create private and secure group chats, fostering communication within larger contexts while maintaining privacy.' }] },
      { name: 'Customizable Settings', children: [{ name: 'Tailor your PrivateChat experience with customizable settings to meet your privacy preferences and communication needs.' }] },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  private _transformer = (node: Point, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _snackBar: MatSnackBar) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
