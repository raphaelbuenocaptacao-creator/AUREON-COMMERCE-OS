'use client';

import { useMemo, useState } from 'react';
import {
  BarChart3,
  Boxes,
  BrainCircuit,
  ChevronRight,
  CircleDollarSign,
  Crosshair,
  Flame,
  Gauge,
  LayoutDashboard,
  Megaphone,
  PackageSearch,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
} from 'lucide-react';

type ModuleKey = 'Visão Geral' | 'Drop Hunter' | 'Info Hunter' | 'Spy Center' | 'Offer Builder' | 'Ads Lab' | 'Analytics';

const nav: Array<{ label: ModuleKey; icon: React.ComponentType<{ size?: number }> }> = [
  { label: 'Visão Geral', icon: LayoutDashboard },
  { label: 'Drop Hunter', icon: PackageSearch },
  { label: 'Info Hunter', icon: BrainCircuit },
  { label: 'Spy Center', icon: Crosshair },
  { label: 'Offer Builder', icon: WandSparkles },
  { label: 'Ads Lab', icon: Megaphone },
  { label: 'Analytics', icon: BarChart3 },
];

const products = [
  { name: 'Mini projetor portátil', niche: 'Eletrônicos', score: 92, margin: 'R$ 117', trend: '+38%', status: 'TESTAR' },
  { name: 'Escova alisadora 5 em 1', niche: 'Beleza', score: 88, margin: 'R$ 84', trend: '+31%', status: 'TESTAR' },
  { name: 'Luminária sunset RGB', niche: 'Casa & Decor', score: 83, margin: 'R$ 69', trend: '+24%', status: 'OBSERVAR' },
  { name: 'Massageador cervical', niche: 'Bem-estar', score: 79, margin: 'R$ 96', trend: '+18%', status: 'OBSERVAR' },
];

const infoOffers = [
  { name: 'IA para pequenos negócios', format: 'Curso + templates', score: 91, demand: 'Alta' },
  { name: 'Conteúdo que vende no Instagram', format: 'Método + comunidade', score: 87, demand: 'Alta' },
  { name: 'Organização financeira simples', format: 'Planilha + aulas', score: 82, demand: 'Média/Alta' },
];

function Score({ value }: { value: number }) {
  return <span className={`score ${value >= 90 ? 'hot' : value >= 80 ? 'good' : ''}`}>{value}</span>;
}

export default function Home() {
  const [active, setActive] = useState<ModuleKey>('Visão Geral');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter((p) => `${p.name} ${p.niche}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div><strong>AUREON</strong><span>COMMERCE OS</span></div>
        </div>
        <div className="workspace-label">INTELLIGENCE SUITE</div>
        <nav>
          {nav.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => setActive(label)} className={active === label ? 'active' : ''}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card"><Sparkles size={18}/><div><b>Plano Founder</b><span>Todos os módulos ativos</span></div></div>
          <div className="profile"><div className="avatar">RB</div><div><b>Raphael Bueno</b><span>Administrador</span></div></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p>AUREON Intelligence</p><h1>{active}</h1></div>
          <div className="top-actions"><span className="live"><i/> Radar ativo</span><button className="primary"><Sparkles size={16}/> Nova análise</button></div>
        </header>

        {active === 'Visão Geral' && <>
          <section className="hero">
            <div className="hero-copy"><span className="eyebrow"><Flame size={15}/> OPPORTUNITY ENGINE</span><h2>Descubra o que vender<br/><em>antes da maioria.</em></h2><p>Produtos, infoprodutos, concorrentes e ofertas analisados em um único sistema.</p><div className="hero-actions"><button className="primary big" onClick={() => setActive('Drop Hunter')}>Minerar oportunidade <ChevronRight size={17}/></button><button className="ghost" onClick={() => setActive('Spy Center')}>Abrir Spy Center</button></div></div>
            <div className="hero-score"><div className="orbit"><Gauge size={38}/><strong>92</strong><span>/100</span></div><b>Maior oportunidade agora</b><p>Mini projetor portátil</p><small>Score AUREON</small></div>
          </section>

          <section className="metrics">
            <div><span><Target size={18}/> Oportunidades</span><strong>128</strong><small>+24 esta semana</small></div>
            <div><span><TrendingUp size={18}/> Tendências quentes</span><strong>17</strong><small>6 em aceleração</small></div>
            <div><span><CircleDollarSign size={18}/> Margem média</span><strong>58%</strong><small>nas melhores ofertas</small></div>
            <div><span><Users size={18}/> Concorrentes</span><strong>346</strong><small>monitorados no radar</small></div>
          </section>

          <section className="grid-2">
            <div className="panel"><div className="panel-head"><div><span className="overline">DROP RADAR</span><h3>Produtos em destaque</h3></div><button onClick={() => setActive('Drop Hunter')}>Ver todos <ChevronRight size={14}/></button></div><div className="table">{products.slice(0,3).map(p => <div className="row" key={p.name}><Score value={p.score}/><div className="grow"><b>{p.name}</b><span>{p.niche}</span></div><div><b>{p.margin}</b><span>margem</span></div><strong className="trend">{p.trend}</strong></div>)}</div></div>
            <div className="panel"><div className="panel-head"><div><span className="overline">INFO RADAR</span><h3>Mercados com demanda</h3></div><button onClick={() => setActive('Info Hunter')}>Ver todos <ChevronRight size={14}/></button></div><div className="table">{infoOffers.map(p => <div className="row" key={p.name}><Score value={p.score}/><div className="grow"><b>{p.name}</b><span>{p.format}</span></div><span className="pill">{p.demand}</span></div>)}</div></div>
          </section>
        </>}

        {active === 'Drop Hunter' && <section className="module-view"><div className="module-hero"><div><span className="eyebrow"><PackageSearch size={15}/> DROP HUNTER</span><h2>Encontre produtos com potencial de escala.</h2><p>Valide tendência, margem, saturação e força de oferta antes de colocar dinheiro em anúncio.</p></div><div className="searchbox"><Search size={19}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar produto ou nicho..."/></div></div><div className="panel"><div className="panel-head"><div><span className="overline">RADAR DE PRODUTOS</span><h3>Oportunidades priorizadas</h3></div><span className="live"><i/> Atualizado</span></div><div className="table detailed">{filteredProducts.map(p => <div className="row" key={p.name}><Score value={p.score}/><div className="grow"><b>{p.name}</b><span>{p.niche}</span></div><div><b>{p.margin}</b><span>lucro estimado</span></div><strong className="trend">{p.trend}</strong><span className="pill">{p.status}</span><button className="round"><ChevronRight size={16}/></button></div>)}</div></div></section>}

        {active === 'Info Hunter' && <section className="module-view"><div className="module-hero"><div><span className="eyebrow"><BrainCircuit size={15}/> INFO HUNTER</span><h2>Transforme dores em ofertas digitais.</h2><p>Mapeie demanda, promessa, formato, ticket e saturação para encontrar oportunidades de infoproduto.</p></div><button className="primary"><Sparkles size={16}/> Minerar nicho</button></div><div className="card-grid">{infoOffers.map(item => <article className="opportunity-card" key={item.name}><div className="card-top"><Score value={item.score}/><span className="pill">Demanda {item.demand}</span></div><h3>{item.name}</h3><p>{item.format}</p><div className="mini-stats"><span>Concorrência <b>Média</b></span><span>Potencial <b>Alto</b></span></div><button>Explorar oportunidade <ChevronRight size={15}/></button></article>)}</div></section>}

        {active === 'Spy Center' && <EmptyModule icon={<Crosshair size={30}/>} eyebrow="SPY CENTER" title="Inteligência competitiva em um painel." text="Central para monitorar concorrentes, ofertas, anúncios, preços, criativos e movimentações do mercado." chips={['Lojas', 'Anúncios', 'Criativos', 'Preços', 'Ofertas']}/>}
        {active === 'Offer Builder' && <EmptyModule icon={<WandSparkles size={30}/>} eyebrow="OFFER BUILDER" title="Do produto à oferta pronta para vender." text="Construa promessa, copy, página, bônus, order bump, upsell e ângulos de campanha com assistência de IA." chips={['Copy', 'Landing Page', 'Bônus', 'Upsell', 'Preço']}/>}
        {active === 'Ads Lab' && <EmptyModule icon={<Megaphone size={30}/>} eyebrow="ADS LAB" title="Crie e organize seus testes de criativos." text="Laboratório para hipóteses, hooks, scripts, criativos, públicos e acompanhamento dos testes de mídia." chips={['Hooks', 'Scripts', 'Criativos', 'Públicos', 'Testes A/B']}/>}
        {active === 'Analytics' && <EmptyModule icon={<BarChart3 size={30}/>} eyebrow="ANALYTICS" title="Decisão baseada em lucro, não em vaidade." text="Acompanhe receita, CAC, ROAS, margem, conversão, ticket, lucro e desempenho por produto e campanha." chips={['Receita', 'ROAS', 'CAC', 'Margem', 'Lucro']}/>}
      </section>
    </main>
  );
}

function EmptyModule({ icon, eyebrow, title, text, chips }: { icon: React.ReactNode; eyebrow: string; title: string; text: string; chips: string[] }) {
  return <section className="empty-module"><div className="module-icon">{icon}</div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p><div className="chips">{chips.map(c => <span key={c}>{c}</span>)}</div><button className="primary big"><Sparkles size={16}/> Iniciar módulo</button><div className="trust"><ShieldCheck size={15}/> Estrutura preparada para dados reais e automações</div></section>;
}
