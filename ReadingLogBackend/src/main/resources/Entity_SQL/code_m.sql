create table public.code_m
(
    group_cd varchar(4)  not null
        constraint code_m_pk
            primary key,
    group_nm varchar(20) not null
);

comment on table public.code_m is '그룹코드';

comment on column public.code_m.group_cd is '그룹코드';

comment on column public.code_m.group_nm is '그룹코드명';

alter table public.code_m
    owner to readinglog;

