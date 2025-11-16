// Register partials
const partials = [
  // Atoms
  { name: 'button', path: 'components/atoms/button.hbs' },
  { name: 'text', path: 'components/atoms/text.hbs' },
  { name: 'icon', path: 'components/atoms/icon.hbs' },

  // Molecules
  { name: 'card-header', path: 'components/molecules/card-header.hbs' },
  { name: 'card-footer', path: 'components/molecules/card-footer.hbs' },

  // Organisms
  { name: 'card', path: 'components/organisms/card.hbs' }
];

// Helper function to fetch and register Handlebars partials
async function registerPartials() {
  for (const p of partials) {
    const res = await fetch(p.path);
    const text = await res.text();
    Handlebars.registerPartial(p.name, text);
  }
}

// Render dashboard widgets
async function renderDashboard() {
  await registerPartials();

  // Widget data
  const widgets = [
    {
      template: 'components/dashboard-widgets/stats-card.hbs',
      context: {
        title: 'Sales Stats',
        content: 'Sales increased by 25% this month!'
      }
    },
    {
      template: 'components/dashboard-widgets/message-card.hbs',
      context: {
        title: 'Inbox',
        content: 'You have 12 new messages.'
      }
    }
  ];

  const dashboard = document.getElementById('dashboard');

  for (const widget of widgets) {
    const res = await fetch(widget.template);
    const templateText = await res.text();
    const template = Handlebars.compile(templateText);
    dashboard.innerHTML += template(widget.context);
  }
}

// Initialize
renderDashboard();