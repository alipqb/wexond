import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import React from 'react';
import Store from '../../store';

import Folder from '../Folder';
import Item from '../Item';
import TreeBar from '../TreeBar';
import {
  Content, Folders, Items, SubTitle,
} from './styles';

@observer
class Bookmarks extends React.Component {
  componentDidMount() {
    Store.data = {
      folders: [
        {
          title: 'A',
          folders: [],
          items: [],
        },
        {
          title: 'B',
          folders: [
            {
              title: 'B.A',
              folders: [
                {
                  title: 'B.A.A',
                  folders: [],
                  items: [],
                },
              ],
              items: [],
            },
          ],
          items: [],
        },
      ],
      items: [
        {
          title: 'Wexond',
          url: 'https://github.com/wexond/wexond',
          favicon: null,
        },
      ],
    };

    Store.selected = Store.data;
    Store.updatePath();
  }

  public render() {
    const selected = Store.selected;
    const noItems = selected && selected.items.length === 0;

    return (
      <React.Fragment>
        <TreeBar />
        {selected && (
          <Content>
            {selected.folders.length > 0 && <SubTitle>Folders</SubTitle>}
            <Folders>
              {selected.folders.map((data: any, key: any) => <Folder data={data} key={key} />)}
            </Folders>
            {selected.items.length > 0 && <SubTitle>Items</SubTitle>}
            {!noItems && (
              <Items>
                {selected.items.map((data: any, key: any) => <Item data={data} key={key} />)}
              </Items>
            )}
          </Content>
        )}
      </React.Fragment>
    );
  }
}

export default hot(module)(Bookmarks);