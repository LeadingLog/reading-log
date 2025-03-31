create table public.refresh_token
(
    num_seq  integer      not null,
    user_id  integer      not null,
    provider varchar(20)  not null,
    token    varchar(100) not null,
    constraint refresh_token_pk
        primary key (num_seq, user_id)
);

comment on table public.refresh_token is '로그인 토큰값 저장';

comment on column public.refresh_token.num_seq is '번호';

comment on column public.refresh_token.user_id is '사용자 자동ID';

comment on column public.refresh_token.provider is '소셜 정보';

comment on column public.refresh_token.token is '토큰';

alter table public.refresh_token
    owner to readinglog;

