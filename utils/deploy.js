const push = require("git-push");

const remote = {
  url: "git@github.com:weirdpattern/weirdpattern.com",
  branch: "live"
};

push("./public", remote, function() {
  console.log("Site deployed to live branch");
});
