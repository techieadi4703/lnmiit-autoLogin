fetch(chrome.runtime.getURL("config.json"))
  .then(res => res.json())
  .then(sites => {
    const host = window.location.hostname;
    if (!sites[host]) return;
    const { email, password, selectors } = sites[host];
    function fillAndSubmit() {
      const emailInput = document.querySelector(selectors.email);
      const passInput = document.querySelector(selectors.password);
      const signInBtn = document.querySelector(selectors.button);
      if (emailInput && passInput) {
        emailInput.value = email;
        emailInput.dispatchEvent(new Event("input", { bubbles: true }));
        passInput.value = password;
        passInput.dispatchEvent(new Event("input", { bubbles: true }));
        if (signInBtn) {
          setTimeout(() => signInBtn.click(), 500);
        }
      }
    }
    window.addEventListener("load", () => {
      fillAndSubmit();
    });
  });
