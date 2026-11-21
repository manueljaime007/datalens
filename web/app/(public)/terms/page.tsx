import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Calendar,
  CircleCheck,
  EyeOff,
  History,
  Mail,
  ShieldCheck,
  SquareTerminal,
} from "lucide-react";
import { TermsToc } from "@/components/terms/terms-toc";
import { TermsFeedback } from "@/components/terms/terms-feedback";

export const metadata: Metadata = {
  title: "Termos e condições | DataLens",
  description:
    "Condições de utilização do DataLens e garantias de privacidade do motor de análise local.",
};

const sections = [
  { id: "introducao", title: "Introdução" },
  { id: "aceitacao", title: "Aceitação dos termos" },
  { id: "utilizacao", title: "Utilização do serviço" },
  { id: "ficheiros", title: "Ficheiros e dados carregados" },
  { id: "responsabilidade", title: "Responsabilidade do utilizador" },
  { id: "limitacoes", title: "Limitações do serviço" },
  { id: "privacidade", title: "Privacidade e dados" },
  { id: "alteracoes", title: "Alterações aos termos" },
  { id: "contacto", title: "Contacto e apoio" },
];

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  const s = sections[n - 1];
  return (
    <section id={s.id} className="scroll-mt-24">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
        <span className="rounded bg-chart-2/70 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-muted-foreground">
          {String(n).padStart(2, "0")}
        </span>
        {n}. {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

const rules = [
  {
    title: "Uso Justo e Integridade:",
    text: "É proibido realizar qualquer ação suscetível de comprometer a segurança da aplicação, submeter scripts maliciosos, sobrecarregar propositadamente a máquina anfitriã ou realizar engenharia reversa das rotinas binárias compiladas para WebAssembly.",
  },
  {
    title: "Compatibilidade de Navegadores:",
    text: "O bom funcionamento do analisador depende de um navegador moderno com suporte ativado a ECMAScript 2022, Web Workers e WebAssembly (Chromium, Firefox, Safari ou navegadores baseados nestes motores).",
  },
  {
    title: "Finalidade Lícita:",
    text: "Comprometes-te a não utilizar a ferramenta para processamento ou cruzamento de dados que violem direitos de terceiros, leis laborais, regulamentos tributários ou ordens judiciais emitidas por jurisdição competente.",
  },
];

export default function TermosPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-96 w-[34rem] rounded-full bg-primary/10 blur-3xl print:hidden" />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6">
        {/* Cabeçalho */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
          <ShieldCheck className="size-3.5" /> Legal &amp; conformidade
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tighter sm:text-6xl">Termos e condições</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Conhece as condições de utilização do DataLens e as garantias de privacidade do nosso motor de análise local.
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" /> Última atualização: <b className="text-foreground">24 de Outubro de 2024</b>
          </span>
          <span className="flex items-center gap-1.5">
            <History className="size-3.5" /> Versão em vigor: <b className="text-foreground">1.2</b>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground">
            <ShieldCheck className="size-3.5" /> Zero-Knowledge Arquitetura
          </span>
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {/* Conteúdo */}
          <article className="min-w-0 space-y-12">
            {/* Compromisso */}
            <aside className="flex gap-4 rounded-2xl border-l-4 border-primary bg-chart-2/40 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-chart-2 text-accent-foreground">
                <SquareTerminal className="size-5" />
              </span>
              <div>
                <h2 className="flex flex-wrap items-center gap-2 font-semibold tracking-tight">
                  Compromisso de Privacidade Local
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
                    Local-first
                  </span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  O DataLens executa algoritmos de análise exclusivamente na memória temporária do teu navegador (WebAssembly/JS). Os teus ficheiros CSV e informações financeiras de vendas nunca são transmitidos nem armazenados em servidores remotos. Todo o processamento ocorre no teu dispositivo.
                </p>
              </div>
            </aside>

            <Section n={1} title="Introdução">
              <p>
                Bem-vindo ao DataLens. O presente documento regula os termos contratuais e condições gerais de utilização aplicáveis aos serviços digitais acessíveis através da plataforma DataLens. A nossa solução disponibiliza ferramentas de visualização, transformação e diagnóstico analítico sobre conjuntos de dados comerciais distribuídos em formato tabular delimitado por vírgulas (CSV).
              </p>
              <p>
                A conceção da plataforma assenta na premissa da total transparência operacional e preservação estrita do sigilo negocial, permitindo que gestores, analistas de receitas e equipas de vendas transformem dados brutos em decisões acionáveis sem fricção de infraestrutura externa.
              </p>
            </Section>

            <Section n={2} title="Aceitação dos termos">
              <p>
                Ao aceder, explorar ou utilizar qualquer funcionalidade do DataLens (incluindo a ingestão direta de ficheiros através da nossa interface gráfica de utilizador), reconheces expressamente que leste, compreendeste e concordas em ficar vinculado a estes Termos e Condições, bem como à nossa Política de Privacidade.
              </p>
              <p>
                Caso não concordes integralmente com as cláusulas aqui estipuladas, deves cessar de imediato a navegação e a utilização do motor de análise. O uso continuado após quaisquer revisões subsequentes constitui a tua aceitação plena das modificações comunicadas.
              </p>
            </Section>

            <Section n={3} title="Utilização do serviço">
              <p>
                O DataLens concede-te uma licença limitada, não exclusiva, intransmissível e revogável para utilizar o serviço de acordo com as seguintes normas de conduta e requisitos operacionais:
              </p>
              <ul className="space-y-3">
                {rules.map((r) => (
                  <li key={r.title} className="flex gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p>
                      <b className="font-semibold text-foreground">{r.title}</b> {r.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section n={4} title="Ficheiros e dados carregados">
              <p>
                A titularidade dos teus dados é sagrada. O DataLens estabelece de forma categórica que{" "}
                <b className="text-foreground">todos os direitos de propriedade intelectual, direitos de autor e segredos de negócio</b>{" "}
                respeitantes às tabelas CSV, relatórios de faturas, identificadores de cliente e métricas financeiras importadas pertencem exclusivamente a ti ou aos teus legítimos licenciantes.
              </p>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold tracking-tight text-foreground">Declaração de Não-Acesso</h3>
                <p className="mt-2 text-xs leading-relaxed">
                  Ao contrário das plataformas analíticas tradicionais em nuvem, o DataLens não recebe, replica, armazena, faz cópias de segurança (backup) nem monitoriza o conteúdo numérico ou descritivo das tuas folhas de cálculo. O processo de parsing do ficheiro ocorre no isolamento de sandbox do teu browser.
                </p>
              </div>
            </Section>

            <Section n={5} title="Responsabilidade do utilizador">
              <p>
                É da tua inteira e exclusiva responsabilidade assegurar a exatidão, formatação e veracidade dos ficheiros submetidos à análise. Recomendamos que procedas à conferência manual antes de validar deduções orçamentais, pagamentos de comissões ou relatórios executivos de encerramento fiscal.
              </p>
              <p>
                Reconheces que o DataLens é um instrumento de cálculo assistido e que eventuais discrepâncias resultantes de colunas mal identificadas, codificações de caracteres incompatíveis (ex.: ISO-8859 em vez de UTF-8) ou formatações numéricas ambíguas (vírgulas vs. pontos como separadores decimais) devem ser retificadas no arquivo-fonte.
              </p>
            </Section>

            <Section n={6} title="Limitações do serviço">
              <p>
                O serviço é prestado &quot;no estado em que se encontra&quot; (&quot;as is&quot;) e &quot;conforme disponível&quot; (&quot;as available&quot;), sem garantias explícitas ou implícitas de comercialização, adequação a um propósito específico ou ausência de pequenas anomalias sistémicas em ficheiros com mais de um milhão de linhas em dispositivos com memória RAM reduzida.
              </p>
              <p>
                Na extensão máxima permitida pela lei aplicável, a equipa do DataLens não poderá ser responsabilizada por lucros cessantes, perdas financeiras, interrupção de atividade ou danos acidentais decorrentes do uso ou da impossibilidade de utilização da aplicação.
              </p>
            </Section>

            <Section n={7} title="Privacidade e tratamento de dados">
              <p>
                A proteção da tua privacidade é o alicerce fundamental do DataLens. O nosso modelo técnico prescinde intencionalmente da recolha de dados sensíveis:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
                    <EyeOff className="size-4 text-primary" /> Sem Telemetria de Dados
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed">
                    Nunca registamos os nomes de clientes, artigos vendidos, margens de lucro ou qualquer valor numérico presente no ficheiro carregado.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
                    <Activity className="size-4 text-primary" /> Métricas Agregadas Mínimas
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed">
                    Apenas monitorizamos erros de carregamento estático e tempos de resposta anónimos da aplicação para fins de manutenção e estabilidade do portal web.
                  </p>
                </div>
              </div>
              <p>
                Para mais detalhes relativos a direitos de acesso, retificação ou eliminação de metadados de sessão em conformidade com o RGPD, consulta a nossa documentação técnica dedicada.
              </p>
            </Section>

            <Section n={8} title="Alterações aos termos">
              <p>
                Reservamo-nos o direito de rever periodicamente estas disposições de modo a refletir alterações legislativas, melhorias funcionais na arquitetura ou implementação de novos métodos de exportação de dados.
              </p>
              <p>
                Todas as revisões de relevância jurídica serão devidamente assinaladas com um carimbo temporal renovado no cabeçalho desta página e publicadas com antecedência no nosso{" "}
                <Link href="/changelog" className="font-semibold text-accent-foreground hover:underline">
                  Changelog público
                </Link>
                .
              </p>
            </Section>

            <Section n={9} title="Contacto e apoio">
              <p>
                Para o esclarecimento de dúvidas regulatórias, sugestões sobre os termos contratuais ou pedidos de suporte técnico institucional, disponibilizamos os seguintes canais diretos de comunicação:
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-chart-2/40 p-5">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold tracking-wide uppercase">Canal oficial de conformidade</p>
                    <p className="text-lg font-bold tracking-tight text-foreground">suporte@datalens.ao</p>
                  </div>
                </div>
                <a
                  href="mailto:suporte@datalens.ao"
                  className="inline-flex items-center gap-3 rounded-full bg-foreground py-1.5 pr-1.5 pl-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  Enviar mensagem
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </div>
            </Section>

            <TermsFeedback />
          </article>

          {/* Índice lateral */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TermsToc sections={sections} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}