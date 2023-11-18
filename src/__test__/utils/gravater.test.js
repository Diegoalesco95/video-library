import gravatar from '../../utils/gravatar';

describe('Gravatar function', () => {
  it('Should return gravatar default url', () => {
    const email = 'johndoe@email.com';
    const gravatarDefaultImage = 'https://gravatar.com/avatar/850cb023e169427bb9eb3f3b18d0f091';
    expect(gravatar(email)).toEqual(gravatarDefaultImage);
  });
});
