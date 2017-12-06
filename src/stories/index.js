import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../components/Button';
import ArticleForm from '../forms/ArticleForm';

storiesOf('Button', module)
  .add('basic', () => (
    <div>
      <div>
        <Button onClick={action('clicked')}>Normal</Button>
        {' '}
        <Button primary onClick={action('clicked')}>Primary</Button>
      </div>
    </div>
  ))

storiesOf('Form', module)
  .add('basic', () => (
    <div>
      <div style={{"maxWidth": "500px"}}>
        <ArticleForm onSubmit={action('submit')} />
      </div>
    </div>
  ))
