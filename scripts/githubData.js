document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll("[id^='project-']");
    const githubUser = "DimitryGonzales";

    projects.forEach(async project => {
        const repoName = project.id.replace("project-", "");

        try {
            const repoRes = await fetch(`https://api.github.com/repos/${githubUser}/${repoName}`);
            const repoData = await repoRes.json();

            const contributorsRes = await fetch(
                `https://api.github.com/repos/${githubUser}/${repoName}/contributors?anon=true`
            );
            const contributors = await contributorsRes.json();

            let commitCount = 0;
            if (Array.isArray(contributors)) {
                commitCount = contributors.reduce((sum, c) => sum + (c.contributions || 0), 0);
            }

            const starsEl = project.querySelector(".project-github-stars");
            const commitsEl = project.querySelector(".project-github-commits");

            if (starsEl) starsEl.insertAdjacentText("beforeend", ` ${repoData.stargazers_count ?? 0}`);
            if (commitsEl) commitsEl.insertAdjacentText("beforeend", ` ${commitCount}`);

        } catch (err) {
            console.error(`GitHub fetch failed for ${repoName}:`, err);
        }
    });
});
