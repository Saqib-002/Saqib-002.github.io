document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // get necessary tags
            document.getElementById("name").textContent =
                data.personalInfo.name.toUpperCase();
            document.getElementById("title").textContent =
                data.personalInfo.title.toUpperCase();
            const socialLinksContainer =
                document.getElementById("social-links");
            const skillsMatrixContainer =
                document.getElementById("skills-matrix");
            const experienceList = document.getElementById("experience-list");
            const certificationsList = document.getElementById(
                "certifications-list"
            );
            const projectsList = document.getElementById("projects-list");
            const educationList = document.getElementById("education-list");

            // Social links
            const socialLinksData = data.personalInfo.socialLinks;
            for (const platform in socialLinksData) {
                const linkData = socialLinksData[platform];
                const a = document.createElement("a");
                a.href = linkData.url;
                a.target = "_blank";
                a.setAttribute("area-label", linkData.label);
                a.innerHTML =
                    getSocialSvg(platform) + `<span>${linkData.label}</span>`;
                socialLinksContainer.appendChild(a);
            }
            document.getElementById("profile-summary").innerHTML =
                data.summary.profile;

            // EDUCATION
            data.education.forEach((edu, index) => {
                const educationItem = document.createElement("div");
                educationItem.className = "education-item";

                let marksHtml = "";
                if (edu.marks) {
                    marksHtml = ` • ${
                        edu.isGpa ? "CGPA" : "Marks"
                    }: <span class="education-metric-highlight">${
                        edu.marks
                    }</span>`;
                }

                let awardHtml = "";
                if (edu.award) {
                    awardHtml = `<div class="education-gold-badge">${edu.award}</div>`;
                }

                educationItem.innerHTML = `
          <h4 class="education-title">${edu.degree}</h4>
          <p class="education-institute">${edu.institute}</p>
          <p class="education-timeline">
            ${edu.timeline}${marksHtml}
          </p>
          ${awardHtml}
        `;
                educationList.appendChild(educationItem);
            });

            // SKILLS
            data.skills.forEach((skillCat, index) => {
                const skillsCatDiv = document.createElement("div");
                skillsCatDiv.className = "skills-cat";
                skillsCatDiv.innerHTML = `<h4>[${skillCat.category}]</h4>`;
                const skillsItemDiv = document.createElement("div");
                skillsItemDiv.className = "skill-item";
                skillCat.items.forEach((skill, skillIndex) => {
                    const delay = 0.6 + index * 0.1 + skillIndex * 0.05;
                    skillsItemDiv.innerHTML += `
            <div class="skill-tag animate-slide-in-up" style="--delay: ${delay}s">
              ${skill}
            </div>
          `;
                });
                skillsCatDiv.appendChild(skillsItemDiv);
                skillsMatrixContainer.appendChild(skillsCatDiv);
            });

            // EXPERIENCE
            data.experience.forEach((exp, index) => {
                const delay = 0.8 + index * 0.2;
                experienceList.innerHTML += `
          <div class="experience-item hud-panel animate-slide-in-up" style="--delay: ${delay}s">
            <div class="experience-title">
              <h4>${exp.title}</h4>
            </div>
            <p class="experience-institute">${exp.company}</p>
            <p class="experience-timeline">${exp.timeline}</p>
            <p class="experience-description">
              ${exp.description}
            </p>
          </div>
        `;
            });
            // Certifications
            data.certifications.forEach((cert, index) => {
                const delay = 1 + index * 0.1;
                certificationsList.innerHTML += `
          <div
            class="hud-panel certification-item animate-slide-in-up"
            style="--delay: ${delay}s"
          >
            <h4>${cert.name}</h4>
            <p>${cert.institute}</p>
            <a href="${cert.link}" target="_blank" rel="noopener noreferrer nofollow">See Credentials</a>
          </div>
        `;
            });
            // Projects
            data.projects.forEach((project, index) => {
                const delay = 1.2 + index * 0.2;
                const techTags = project.techStack
                    .map((tag) => `<div class="skill-tag">${tag}</div>`)
                    .join("");
                projectsList.innerHTML += `
          <div class="hud-panel project-item animate-slide-in-up" style="--delay: ${delay}s">
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-hover-overlay">
              <a href="${project.liveLink}" class="view-link" target="_blank">
                <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zm0 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                </svg>
                <span>View Project</span>
              </a>
              <a href="${project.githubLink}" class="view-link" target="_blank">
                <svg class="h-6 w-6 text-[#4b6b8b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        `;
            });
        })
        .catch((err) => console.log("error fetting data", err));
    function getSocialSvg(platform) {
        const svgs = {
            mail: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
            linkedin: `<svg className="h-6 w-6 text-[#4b6b8b]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
            github: `<svg className="h-6 w-6 text-[#4b6b8b]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
        };
        return svgs[platform] || "";
    }
});
