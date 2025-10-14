(async function githubDomFiller() {
    const GITHUB_USER = 'DimitryGonzales';
    const SUPPORTED = [
        'lastCommit',
        'stars',
        'commits',
        'forks',
        'description',
        'openIssues',
        'watchers',
        'license'
    ];

    function timeAgoOrDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return d.toLocaleDateString();
    }

    function parseLastPageFromLink(linkHeader) {
        if (!linkHeader) return null;
        const parts = linkHeader.split(',');
        for (const p of parts) {
            const [urlPart, relPart] = p.split(';').map(s => s.trim());
            if (!relPart) continue;
            if (relPart.includes('rel="last"')) {
                const m = urlPart.match(/[?&]page=(\d+)/);
                if (m) return parseInt(m[1], 10);
            }
        }
        return null;
    }

    const matches = Array.from(document.querySelectorAll('[id^="github-"]')).map(el => {
        const m = el.id.match(/^github\-([^-\s]+)\-([^\s]+)$/);
        return m ? { el, dataType: m[1], repo: m[2] } : null;
    }).filter(Boolean);

    if (matches.length === 0) return;

    const byRepo = {};
    for (const { el, dataType, repo } of matches) {
        if (!SUPPORTED.includes(dataType)) {
            console.warn(`Unsupported dataType "${dataType}" for #${el.id}`);
            continue;
        }
        if (!byRepo[repo]) byRepo[repo] = [];
        byRepo[repo].push({ el, dataType });
    }

    for (const [repo, elements] of Object.entries(byRepo)) {
        try {
            const repoApi = `https://api.github.com/repos/${GITHUB_USER}/${repo}`;
            const repoRes = await fetch(repoApi);
            const repoJson = repoRes.ok ? await repoRes.json() : null;

            const commitsApi = `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits?per_page=1`;
            const commitsRes = await fetch(commitsApi);
            const commitsJson = commitsRes.ok ? await commitsRes.json() : null;
            const linkHeader = commitsRes.headers ? commitsRes.headers.get('link') : null;
            const lastPage = parseLastPageFromLink(linkHeader);
            const commitsCount = lastPage !== null ? lastPage : (Array.isArray(commitsJson) ? commitsJson.length : '');

            let latestCommitDate = '';
            if (Array.isArray(commitsJson) && commitsJson[0] && commitsJson[0].commit && commitsJson[0].commit.author) {
                latestCommitDate = commitsJson[0].commit.author.date;
            }

            const values = {
                stars: repoJson ? repoJson.stargazers_count : '',
                forks: repoJson ? repoJson.forks_count : '',
                description: repoJson ? (repoJson.description || '') : '',
                openIssues: repoJson ? repoJson.open_issues_count : '',
                watchers: repoJson ? repoJson.watchers_count : '',
                license: repoJson && repoJson.license ? repoJson.license.spdx_id || repoJson.license.name : '',
                commits: commitsCount,
                lastCommit: latestCommitDate ? timeAgoOrDate(latestCommitDate) : ''
            };

            for (const { el, dataType } of elements) {
                el.textContent = values[dataType] !== null && values[dataType] !== undefined ? values[dataType] : '';
            }
        } catch (err) {
            console.error('Error fetching repo', repo, err);
            for (const { el } of elements) el.textContent = '';
        }
    }
})();
