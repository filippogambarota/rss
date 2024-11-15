const forEach = (arr, fn) => {
  let str = '';
  arr.forEach(i => str += fn(i) || '');
  return str;
};

const article = (item) => `
  <article class="item">
    <header class="item__header">
      <a href="${item.link}" target='_blank' rel='noopener norefferer nofollow'>
        ${item.title}
      </a>
    </header>

    <small>
      ${item.feedUrl ? `<span class="item__feed-url monospace">${item.feedUrl}</span>` : ''}
      <ul class="article-links">
        <li class="monospace">${item.timestamp || ''}</li>
        ${item.comments ? `
          <li><a href="${item.comments}" target='_blank' rel='noopener norefferer nofollow'>comments</a></li>
        ` : ''
        }
        <li><a href="https://txtify.it/${item.link}" target='_blank' rel='noopener norefferer nofollow'>txtify</a></li>
        <li><a href="https://archive.md/${item.link}" target='_blank' rel='noopener norefferer nofollow'>archive.md</a></li>
      </ul>
    </small>
  </article>
`;

export const template = ({ allItems, groups, errors, now }) => (`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>👻 reader</title>
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
  <div class="app">
    <input type="checkbox" class="menu-btn" id="menu-btn" />
    <label class="menu-label" for="menu-btn"></label>

    <div class="sidebar">
      <header>
        <h1 class="inline" style="user-select: none;">👻 <a href="https://github.com/filippogambarota/rss"><i class="fa-brands fa-github fa-2xs"></i></a></h1>
        <ul class="group-selector">
          <li><a href="#all-articles">all articles</a></li>
          ${forEach(groups, group => `
            <li><a href="#${group[0]}">${group[0]}</a></li>
          `)}
        </ul>
      </header>

      <footer>
        ${errors.length > 0 ? `
          <h2>Errors</h2>
          <p>There were errors trying to parse these feeds:</p>
          <ul>
          ${forEach(errors, error => `
            <li>${error}</li>
          `)}
          </ul>
        ` : ''
        }

        <p>
          Last updated ${now}.
        </p>
      </footer>
    </div>

    <main>
      <section id="all-articles">
        <h2>all articles</h2>
        ${forEach(allItems, item => article(item))}
      </section>

      ${forEach(groups, ([groupName, feeds]) => `
        <section id="${groupName}">
          <h2>${groupName}</h2>

          ${forEach(feeds, feed => `
            <details>
              <summary>
                <span class="feed-title">${feed.title}</span> 
                <span class="feed-url">
                  <small>
                    (${feed.feed})
                  </small>
                </span>
                <div class="feed-timestamp">
                  <small>Latest: ${feed.items[0] && feed.items[0].timestamp || ''}</small>
                </div>
              </summary>
              ${forEach(feed.items, item => article(item))}
            </details>
          `)}
        </section>
      `)}

        <div class="default-text">
          <p>👻📚 Welcome to Filippo's RSS</p>
          <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2dsZWJ4MzByemc1ZDRremM5M2ltOHY2emJvenF3YjdzZmJjZzAzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TLOl2tSYNSZM0KnpcE/giphy.gif" width="500"/>
        </div>
    </main>
  </div>
</body>
</html>
`);