use db_locadora_filme_ds2m_25_2;

-- TABELA FILME --
CREATE TABLE tbl_filme (
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome			varchar(100) NOT NULL,
	sinopse			text NULL,
	data_lancamento	date NULL,
	duracao			time NOT NULL,
	orcamento		decimal(11,2) NOT NULL,
	trailer			varchar(200) NULL,
	capa			varchar(200) NOT NULL
	);
	
INSERT into tbl_filme ( nome, sinopse, data_lancamento,
						duracao, orcamento, trailer, capa)
						values ("Viagem ao Centro da Terra - O Filme",
								"Em Viagem ao Centro da Terra - O Filme, Trevor Anderson (Brendan Fraser) é um cientista cujas teorias não são bem aceitas pela comunidade científica. Decidido a descobrir o que aconteceu com seu irmão Max, que simplesmente desapareceu, ele parte para a Islândia juntamente com seu sobrinho Sean (Josh Hutcherson) e a guia Hannah. Entretanto em meio à expedição eles ficam presos em uma caverna e, na tentativa de deixar o local, alcançam o centro da Terra. Lá eles encontram um exótico e desconhecido mundo perdido.",
								"2008-07-11",
								"1:32",
								6000000,
								"https://www.adorocinema.com/filmes/filme-111381/",
								"https://m.media-amazon.com/images/M/MV5BYzc2MDExMDUtN2RkMy00NjY4LWIzY2UtMGU2MjhiYWEyMzkwXkEyXkFqcGc@._V1_.jpg");

INSERT into tbl_filme ( nome, sinopse, data_lancamento,
						duracao, orcamento, trailer, capa)
						values ("Harry Potter e o Enigma do Príncipe",
						"Lorde Voldemort (Ralph Fiennes) é uma ameaça real, tanto para o mundo dos bruxos quanto o dos trouxas. Harry Potter (Daniel Radcliffe) suspeita que o perigo esteja dentro da Escola de Magia e Bruxaria de Hogwarts, mas Alvo Dumbledore (Michael Gambon) está mais preocupado em prepará-lo para o confronto final com o Lorde das Trevas. Dumbledore convida seu colega Horácio Slughorn (Jim Broadbent) para ser o novo professor de Poções, já que Severo Snape (Alan Rickman) enfim alcançou o sonho de ministrar as aulas de Defesa Contra as Artes das Trevas. Paralelamente Harry começa a ter um interesse cada vez maior por Gina Weasley (Bonnie Wright), irmã de seu melhor amigo Rony (Rupert Grint), que também é alvo de interesse de Dino Thomas (Alfie Enoch).",
						"2009-07-15",
						"2:33",
						250000000,
						"https://www.adorocinema.com/filmes/filme-116305/",
						"https://m.media-amazon.com/images/M/MV5BYWFjMjkyZTQtZWZiZS00NzE0LWFkOTktNDQ1YzRlNTIxMDhlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg");
						
						
select id from tbl_filme order by id desc limit 1;

-- TABELA GÊNERO --
CREATE TABLE tbl_genero (
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome			varchar(100) NOT NULL
);

INSERT into tbl_genero ( nome )
						values ("Ação");
                        
INSERT into tbl_genero ( nome )
						values ("Suspense");
                        
select * from tbl_genero;

-- TABELA PAÍS DE ORIGEM --
CREATE TABLE tbl_pais_origem (
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome			varchar(100) NOT NULL
    );
    
INSERT into tbl_pais_origem ( nome )
							values ("Estados Unidos da América");
					
select * from tbl_pais_origem;

-- TABELA CLASSIFICAÇÃO INDICATIVA --
CREATE TABLE tbl_classificacao (
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
	classificacao	varchar(50) NOT NULL,
    descricao		varchar(500) NOT NULL,
    simbolo			varchar(500) NULL
    );
    
INSERT into tbl_classificacao ( classificacao, descricao, simbolo )
								values ("Livre (L)",
                                "Violência: Arma sem violência; Morte sem Violência; Ossada ou esqueleto sem violência; Violência Fantasiosa.
Sexo e Nudez: Nudez não erótica.
Drogas: Consumo moderado ou insinuado de droga lícita.",
"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/120px-DJCTQ_-_L.svg.png");

select * from tbl_classificacao;

-- TABELA RELACIONAL ENTRE FILME E GÊNERO --
CREATE TABLE tbl_filme_genero (
	id					int PRIMARY KEY AUTO_INCREMENT NOT NULL,
	id_filme			int not null,
    id_genero			int not null,
    
    constraint			FL_FILME_FILME_GENERO	# Nome da relação
    foreign key			(id_filme)				# Qual a chave estrangeira
    references			tbl_filme(id),			# De onde vem a FK
    
	constraint			FL_GENERO_FILME_GENERO	
    foreign key			(id_genero)				
    references			tbl_genero(id)
);

-- TABELA DE ATORES --
CREATE TABLE tbl_ator (
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome			varchar(100) NOT NULL,
    data_nascimento date NOT NULL,
    descricao		varchar(500) NULL,
    foto			varchar(200) NULL
);

INSERT into tbl_ator ( nome, data_nascimento,
						descricao, foto)
						values ("Brendan James Fraser", "1968-12-03", 
                        "Brendan James Fraser é um ator norte-americano, tendo também a nacionalidade canadense, é conhecido por estrelar diversos filmes de sucesso de aventura e comédia, como A Múmia, George - O Rei da Floresta e Viagem ao Centro da Terra.", 
                        "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSakpuEYw1PMc5nb2EtkYV9qkHEtYrDCLmw_8fK1-S2foEZiFmiYPq4aCzehAspYnWSk1X2j1QH7x2YKyU");

select * from tbl_atores;
select * from tbl_filme;
select * from tbl_filme_genero;

DELETE FROM tbl_filme WHERE id = 30;