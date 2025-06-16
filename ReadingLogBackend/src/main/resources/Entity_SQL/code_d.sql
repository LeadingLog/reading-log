create table public.code_d
(
    detail_cd varchar(8) not null
        constraint code_d_pk
            primary key,
    group_cd  varchar(4) not null,
    detail_nm varchar(20)
);

comment on table public.code_d is '디테일 코드';

comment on column public.code_d.detail_cd is '디테일 코드';

comment on column public.code_d.group_cd is '그룹 코드';

comment on column public.code_d.detail_nm is '디테일 코드명';

alter table public.code_d
    owner to readinglog;

