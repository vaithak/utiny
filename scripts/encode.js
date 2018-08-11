var base62 = require("base62/lib/custom");
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
charset = base62.indexCharset(charset);

function encode_URL(unique_ID, url)
{
  Base62.encode(unique_ID,charset);
}
