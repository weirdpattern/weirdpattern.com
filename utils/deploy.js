const push = require("git-push");

const remote = {
  name: "live",
  url: "git@github.com:weirdpattern/weirdpattern.com",
  branch: "live"
};

push("./public", remote, function(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.info("Site deployed to live branch");
});
