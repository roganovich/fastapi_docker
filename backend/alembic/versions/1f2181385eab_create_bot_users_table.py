"""create bot_users table

Revision ID: 1f2181385eab
Revises: 2bd4999b4ace
Create Date: 2023-10-22 12:08:29.224666

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f2181385eab'
down_revision: Union[str, None] = '2bd4999b4ace'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('bot_users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('chat_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('username', sa.String(length=255), nullable=True),
        sa.Column('first_name', sa.String(length=255), nullable=True),
        sa.Column('last_name', sa.String(length=255), nullable=True),
        sa.Column('language_code', sa.String(), nullable=True),
        sa.Column('is_bot', sa.Boolean(), default=False),
        sa.Column('is_premium', sa.Boolean(), default=False),
        sa.Column('status', sa.Integer(), default=1),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )

    pass

def downgrade() -> None:
    op.drop_table('bot_users')
    pass
