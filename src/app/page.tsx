'use client';

import kdcTable from '../../public/json/kdc-table.json';
import _ from 'lodash';
import { Cascader, Divider } from 'antd';

const 주류 = kdcTable.map((item) => ({ [item.주류코드]: item.주류 }));
const 강목 = kdcTable.map((item) => ({ [item.강목코드]: item.강목 }));
const 요목 = kdcTable.map((item) => ({ [item.요목코드]: item.요목 }));

const 주류unique = Array.from(new Set(주류.map(JSON.stringify))).map(JSON.parse);

const 강목unique = Array.from(new Set(강목.map(JSON.stringify))).map(JSON.parse);

const 요목unique = Array.from(new Set(요목.map(JSON.stringify))).map(JSON.parse);

const options = 주류unique.map((item) => {
  const [[주류key, value]] = Object.entries(item);

  return {
    value: 주류key,
    label: `${주류key} ${value}`,
    children: 강목unique
      .filter((item) => Object.keys(item)[0].startsWith(주류key[0]))
      .map((item) => {
        const [[강목key, value]] = Object.entries(item);

        return {
          value: 강목key,
          label: `${강목key} ${value}`,
          children: 요목unique
            .filter((item) => Object.keys(item)[0].startsWith(강목key[0] + 강목key[1]))
            .map((item) => {
              const [[요목key, value]] = Object.entries(item);

              return {
                value: 요목key,
                label: `${요목key} ${value}`,
              };
            }),
        };
      }),
  };
});

export default function Home() {
  const onChange = async (value: any) => {
    const 요목key = value[value.length - 1];
    const 요목value = Object.values(요목unique[요목key])[0];

    const target = `${요목key} ${요목value}`;
    await navigator.clipboard.writeText(target);
  };

  const dropdownRender = (menus) => (
    <div>
      {menus}
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div
        style={{
          padding: 8,
        }}
      >
        요목을 클릭하면 클립보드에 복사됩니다.
      </div>
    </div>
  );

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '100px',
        }}
      >
        <h1>KDC 한국십진분류표</h1>
      </header>
      <main
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
        }}
      >
        <Cascader
          dropdownClassName="kdcTable"
          dropdownRender={dropdownRender}
          options={options}
          onChange={onChange}
          placeholder="KDC 한국십진분류표"
          expandTrigger="hover"
          open
        />
      </main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <footer
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            margin: '0 auto',
            bottom: 0,
          }}
        >
          <p>Copyright 2023. 박영진. All rights reserved.</p>
          <a href="https://github.com/yogjin/" target="_blank">
            yogjin github
          </a>
        </footer>
      </div>
    </>
  );
}
