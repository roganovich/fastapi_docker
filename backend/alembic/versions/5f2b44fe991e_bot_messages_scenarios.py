"""bot_messages_scenarios

Revision ID: 5f2b44fe991e
Revises: 1f2181385eab
Create Date: 2023-10-22 20:22:25.717813

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5f2b44fe991e'
down_revision: Union[str, None] = '1f2181385eab'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('bot_messages_scenarios',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=True),
        sa.Column('description', sa.String(length=255), nullable=True),
        sa.Column('command', sa.String(length=100), nullable=True),
        sa.Column('class_name', sa.String(100), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    pass


def downgrade() -> None:
    op.drop_table('bot_messages_scenarios')
    pass
